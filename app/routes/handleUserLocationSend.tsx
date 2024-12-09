import { sendUserLocation } from '~/models/userLocation';

export async function action({ request }: { request: Request }) {
  const formData = new URLSearchParams(await request.text());

  const rowIndex = formData.get('rowIndex');
  const columnId = formData.get('columnId');
  const editorId = formData.get('editorId');

  if (!columnId || !rowIndex || !editorId) {
    return Response.json({
      error: 'ColumnID or RowIndex does not exist',
    });
  }

  await sendUserLocation({ rowIndex, columnId, editorId });

  return Response.json({ success: true });
}
