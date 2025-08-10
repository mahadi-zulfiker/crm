import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import multer from 'multer';
import streamifier from 'streamifier';

export const config = {
  api: {
    bodyParser: false
  }
};

const storage = multer.memoryStorage();
const upload = multer({ storage });

function runMiddleware(req, fn) {
  return new Promise((resolve, reject) => {
    fn(req, {}, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'next_uploads' },
      (error, result) => {
        if (error) {
          resolve(NextResponse.json({ error }, { status: 500 }));
        } else {
          resolve(NextResponse.json({ url: result.secure_url, public_id: result.public_id }));
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}
