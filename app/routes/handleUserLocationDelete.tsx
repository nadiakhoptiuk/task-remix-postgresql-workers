import { deleteCurrentUserLocation } from '~/models/userLocation';

export async function action({ request }: { request: Request }) {
  const formData = new URLSearchParams(await request.text());

  const editorId = formData.get('editorId');

  if (!editorId) {
    return Response.json({
      error: 'Editor Id does not exist',
    });
  }

  await deleteCurrentUserLocation(editorId);

  return Response.json({ success: true });
}
