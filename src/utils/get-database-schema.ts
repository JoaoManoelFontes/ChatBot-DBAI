import { pg } from '../db/client'

export async function getDatabaseSchema() {
  // Consulta para obter informações sobre as tabelas e colunas
  const schemaQuery = `
    SELECT 
      table_name, 
      column_name, 
      data_type, 
      is_nullable, 
      column_default 
    FROM 
      information_schema.columns 
    WHERE 
      table_schema = 'public' 
    ORDER BY 
      table_name, ordinal_position;
  `

  const result = await pg.unsafe(schemaQuery)

  let schemaString = ''
  let currentTable = ''

  for (const row of result) {
    if (row.table_name !== currentTable) {
      schemaString += `\n\nCREATE TABLE ${row.table_name} (\n`
      currentTable = row.table_name
    }

    schemaString += `  ${row.column_name} ${row.data_type}`

    if (row.is_nullable === 'NO') {
      schemaString += ' NOT NULL'
    }

    if (row.column_default) {
      schemaString += ` DEFAULT ${row.column_default}`
    }

    schemaString += ',\n'
  }

  schemaString = schemaString.replace(/,\n$/, '\n);')

  return schemaString.trim()
}
