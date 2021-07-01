import database from 'Databases/headline-test/index';

const importValues = async function importValues(self) {
  const all = await database.get();
  const data = all.find((d) => d.id === self.id);

  if (data) {
    self.set('values', {
      user: data.user,
      link: data.link,
      publishDate: data.publishDate,
      notes: data.notes,
      headlines: data.headlines,
    });
  }
};

export default importValues;
