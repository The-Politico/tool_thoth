const headlineTestNotification = function headlineTestNotification(edited) {
  return edited
    ? 'A headline test for a story publishing soon has been edited.'
    : 'A new headline test has been requested and it\'ll '
      + 'be publishing soon.';
};

export default headlineTestNotification;
