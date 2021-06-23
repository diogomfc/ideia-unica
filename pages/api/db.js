import { GoogleSpreadsheet } from 'google-spreadsheet';
import credentials from '../credentials/credentials.json';

export default async function Games(req, res) {

  const dynamicDate = new Date();

  const doc = new GoogleSpreadsheet('1rG9KfIxH-xiCA0oc7hTKyMF_nGZXrjTjkMEo8Jvezhg');

  await doc.useServiceAccountAuth({
    client_email: credentials.client_email,
    private_key: credentials.private_key,
  });

  await doc.loadInfo(); // Carrega a info da planilha

  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows()

  const games = rows.map(({

    id,
    name,
    image,
    data

  }) => {
    return {
      id,
      name,
      image,
      data
    }
  })

  console.log('CONECTADO A BASE DE DADOS', doc.title);

  res.send({
    date: dynamicDate.toGMTString(),
    title: doc.title,
    games
  })
}