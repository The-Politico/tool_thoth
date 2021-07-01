import database from 'Databases/headline-test/index';
import toSlackTime from 'Utils/toSlackTime';
import toSlackDate from 'Utils/toSlackDate';
import inXSeconds from 'Utils/inXSeconds';

const importValues = async function importValues(self) {
  const all = await database.get();
  const data = all.find((d) => d.id === self.id);

  const isNow = data.publishDate.getTime() < inXSeconds(3600).getTime();

  if (data) {
    const offset = self.state.tzOffset;
    self.set('values', {
      user: data.user,
      link: data.link,
      publishDate: isNow ? undefined : toSlackDate(data.publishDate, offset),
      publishTime: isNow ? undefined : toSlackTime(data.publishDate, offset),
      notes: data.notes,
      headlines: data.headlines,
    });

    self.updateState({
      verifiedCMSLink: true,
      showScheduler: true,
      verifiedDate: true,
      asap: isNow,
      headlineOptions: data.headlines.length,
      useValuesInView: true,
      useEditingMeta: true,
    });
  }
};

export default importValues;
