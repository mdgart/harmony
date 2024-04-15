'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import axiosWithAuth from './axiosWithAuth';
import { stringToBoolean } from '@/app/lib/utils';
import { auth } from '@/auth';

const FormSchema = z.object({
  id: z.string(),
  title: z.string({
    invalid_type_error: 'Please input a valid title.',
  }),
  is_published: z.boolean({
    invalid_type_error: 'Please select a status.',
  }),
  content: z.string({
    invalid_type_error: 'Please input a valid content.',
  }),
  author: z.number({invalid_type_error: 'Please input a valid author.',})
});
 
export type State = {
  errors?: {
    title?: string[];
    is_published?: string[];
    content?: string[];
    author?: string[];
  };
  message?: string | null;
};

const CreateAnnouncement = FormSchema.omit({ id: true });

export async function createAnnouncement(prevState: State, formData: FormData) {

    const validatedFields = CreateAnnouncement.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
        author: Number(formData.get('author')),
        is_published: stringToBoolean(formData.get('is_published') as string),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Announcement.',
      };
    }
    
    const { title, is_published, content, author } = validatedFields.data;

    try {
      // create database entry
      console.log(title);
      const response = await axiosWithAuth.post('/api/announcements', {
        title,
        is_published,
        content,
        author,
      });
    } catch (error) {
      return {
        status: 500,
        message: 'API Error: Failed to Create Announcement. ' + error,  
      };
      
    }

  revalidatePath('/dashboard/announcements');
  redirect('/dashboard/announcements');
}

const UpdateAnnouncement = FormSchema.omit({ id: true, author: true });

export async function updateAnnouncement(id: number, prevState: State, formData: FormData) {
    const validatedFields = UpdateAnnouncement.safeParse({
      title: formData.get('title'),
      content: formData.get('content'),
      is_published: stringToBoolean(formData.get('is_published') as string),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Announcement.',
    };
  }
  const { title, is_published, content } = validatedFields.data;

  try {
    // update database entry
    const response = await axiosWithAuth.put('/api/announcements/'+id, {
      title,
      is_published,
      content,
    });
  }
  catch (error) {
    return {
      status: 500,
      message: 'API Error: Failed to Update Announcement. ' + error,
    };
  }
 
  revalidatePath('/dashboard/announcements');
  redirect('/dashboard/announcements');
}

export async function deleteAnnouncement(id: number) {
  try {
    // delete database entry
    const response = await axiosWithAuth.delete('/api/announcements/'+id);
  } catch (error) {
    return {
      status: 500,
      message: 'Database Error: Failed to Delete Announcement. ' + error,
    };
  }
  revalidatePath('/dashboard/announcements');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}