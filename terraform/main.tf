provider "aws" {
  region = "us-east-1"
  profile = "apps"
}

terraform {
  backend "s3" {
  bucket = "politico-terraform-configs"
  key = "configs/lambda-thoth-api/terraform.tfstate"
  region = "us-east-1"
  profile = "apps"
  encrypt = true
  }
}

variable "project_slug" {
  type = string
}

variable "slack_headline_test_channel" {
  type = string
}

variable "google_headline_test_help" {
  type = string
}


variable "google_headline_test_analytics" {
  type = string
}

variable "lambda_api_token" {
  type = string
}

variable "notion_api_token" {
  type = string
}

variable "headline_test_database" {
  type = string
}


resource "aws_iam_role" "role" {
  name = "${var.project_slug}__role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_lambda_function" "function" {
  filename = "upload.zip"
  function_name = var.project_slug
  handler = "index.handler"
  source_code_hash = filebase64sha256("upload.zip")
  role= aws_iam_role.role.arn
  runtime="nodejs12.x"
  timeout=600
  memory_size=2048
  environment {
    variables = {
      AWS = "true"
      SLACK_HEADLINE_TEST_CHANNEL = var.slack_headline_test_channel
      GOOGLE_HEADLINE_HELP = var.google_headline_test_help
      GOOGLE_HEADLINE_ANALYTICS = var.google_headline_test_analytics
      NOTION_TOKEN = var.notion_api_token
      HEADLINE_TEST_DATABASE = var.headline_test_database
    }
  }
  layers = [
    "arn:aws:lambda:us-east-1:041537238831:layer:lambda_layer-awssdk:1",
  ]
}

resource "aws_iam_policy" "policy" {
  name        = "${var.project_slug}__policy"
  path        = "/"
  description = "IAM policy for logging from a lambda"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "logs:CreateLogGroup",
        "lambda:InvokeFunction",
        "ssm:GetParameters"
      ],
      "Resource": "*",
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "attachment" {
  role       = aws_iam_role.role.name
  policy_arn = aws_iam_policy.policy.arn
}

resource "aws_api_gateway_rest_api" "gateway" {
  name = "${var.project_slug}__api"
}

resource "aws_api_gateway_resource" "resource" {
  rest_api_id = aws_api_gateway_rest_api.gateway.id
  parent_id   = aws_api_gateway_rest_api.gateway.root_resource_id
  path_part   = "{proxy+}"
}

resource "aws_api_gateway_method" "method" {
   rest_api_id   = aws_api_gateway_rest_api.gateway.id
   resource_id   = aws_api_gateway_resource.resource.id
   http_method   = "ANY"
   authorization = "NONE"
}

resource "aws_api_gateway_method" "method_root" {
   rest_api_id   = aws_api_gateway_rest_api.gateway.id
   resource_id   = aws_api_gateway_rest_api.gateway.root_resource_id
   http_method   = "ANY"
   authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda" {
   rest_api_id = aws_api_gateway_rest_api.gateway.id
   resource_id = aws_api_gateway_method.method.resource_id
   http_method = aws_api_gateway_method.method.http_method

   integration_http_method = "POST"
   type                    = "AWS_PROXY"
   uri                     = aws_lambda_function.function.invoke_arn
}

resource "aws_api_gateway_integration" "lambda_root" {
   rest_api_id = aws_api_gateway_rest_api.gateway.id
   resource_id = aws_api_gateway_method.method_root.resource_id
   http_method = aws_api_gateway_method.method_root.http_method

   integration_http_method = "POST"
   type                    = "AWS_PROXY"
   uri                     = aws_lambda_function.function.invoke_arn
}

resource "aws_api_gateway_deployment" "deployment" {
   depends_on = [
     aws_api_gateway_integration.lambda,
     aws_api_gateway_integration.lambda_root,
   ]

   rest_api_id = aws_api_gateway_rest_api.gateway.id
   stage_name  = "prod"
}

resource "aws_lambda_permission" "apigw" {
   statement_id  = "AllowAPIGatewayInvoke"
   action        = "lambda:InvokeFunction"
   function_name = aws_lambda_function.function.function_name
   principal     = "apigateway.amazonaws.com"

   source_arn = "${aws_api_gateway_rest_api.gateway.execution_arn}/*/*"
}


resource "aws_cloudwatch_event_rule" "bridge" {
  name                = "${var.project_slug}__ht-update"
  description         = "Post the half-hour updates for headline tests"
  schedule_expression = "cron(0/5 * ? * * *)"
}

resource "aws_cloudwatch_event_target" "bridge_target" {
  rule      = aws_cloudwatch_event_rule.bridge.name
  arn       = aws_lambda_function.function.arn
  input     = <<EOF
  {
    "body": {
      "manual": true,
      "endpoint": "bridge",
      "token": "${var.lambda_api_token}",
      "command": "headline-test-update"
    }
  }
EOF
}

resource "aws_lambda_permission" "bridge_permission" {
    action = "lambda:InvokeFunction"
    function_name = aws_lambda_function.function.function_name
    principal = "events.amazonaws.com"
    source_arn = aws_cloudwatch_event_rule.bridge.arn
}

output "base_api_url" {
  value = aws_api_gateway_deployment.deployment.invoke_url
}
