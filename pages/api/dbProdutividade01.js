import { GoogleSpreadsheet } from 'google-spreadsheet';
import credentials from '../credentials/credentials.json';

export default async function ApiDb(req, res) {

  const doc = new GoogleSpreadsheet('1HXMzQlAILM16XhMAfk47nokaNQcy1bNDFVotMRwjeKw');

  await doc.useServiceAccountAuth({
    client_email: credentials.client_email,
    private_key: credentials.private_key,
  });

  await doc.loadInfo(); // Carrega as infos da planilha
  //console.log('Titulo da planilha', doc.title);

  const produtividade_dia = doc.sheetsByIndex[1]; //carregar tabela planilha produtividade_dia de dbBaseMetricasConsultores01
  const rows = await produtividade_dia.getRows();


  //Mapeando linhas e colunas da tabela dbBaseMetricasConsultores01
  const dbMetricasConsultores01_produtividade_dia = rows.map(({
    consultor,
    cpf_cliente,
    status,
    data
  }) => {

    return {
      consultor,
      cpf_cliente,
      status,
      data
    }
  })

  console.log('CONECTADO A BASE DE DADOS:', doc.title);

  res.send({
    title: doc.title,
    dbMetricasConsultores01_produtividade_dia,
  })
}



