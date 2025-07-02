'use server'
import fs from 'fs/promises'
export const onsubmit=async (data)=>{
    let a=data.username
    let b=data.password
     try {
    await fs.writeFile(
      'form_with_server.txt',
      `username: ${a}\t\tpassword: ${b}\n`,
      { flag: 'a' }
    );
    console.log('file written');
  } catch (e) {
    console.error('Error writing file:', e);
  }
    console.log(a);
    console.log(b);
}