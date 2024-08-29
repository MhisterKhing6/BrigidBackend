import fs  from 'node:fs/promises';

async function example() {
  try {
    const data = await fs.readFile('2.png', { encoding: 'base64' });
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
example();