import { runCypher } from './database'

async function main(): Promise<void> {
  try {
    const result = await runCypher(
      `
        MATCH (i:Individual)-[:CHILD]->(c:Individual)
        WITH i, count(c) AS childrenCount
        RETURN i.name, childrenCount
        ORDER BY childrenCount DESC
        LIMIT 1
    `
    )
    console.log('🚀 ~ result:', result)
  } catch (error) {
    console.log('🚀 ~ error:', error)
  }
}

main()
