import config from 'config'
import { auth, driver } from 'neo4j-driver'

const URI = config.get<string>('dbConfig.uri')
const USERNAME = config.get<string>('dbConfig.username')
const PASSWORD = config.get<string>('dbConfig.password')
const DB_NAME = config.get<string>('dbConfig.dbName')

const database = driver(URI, auth.basic(USERNAME, PASSWORD))

export async function runCypher<T>(cypher: string, params?: T) {
  const session = database.session({ database: DB_NAME })

  try {
    const result = await session.executeRead((tx) => tx.run(cypher, params))

    return result.records
  } catch (error) {
    throw error
  } finally {
    await session.close()
  }
}
