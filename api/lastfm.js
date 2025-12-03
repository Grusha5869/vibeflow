export const config = {
  runtime: 'edge'
};

export default async function handler(request) {
  // 1. Получаем URL и параметры из запроса к НАШЕЙ функции
  const incomingUrl = new URL(request.url);
  console.log('🚀 Function called. Full incoming URL:', request.url);
  console.log('📦 Incoming search params:', Object.fromEntries(incomingUrl.searchParams));

  // 2. Создаём новый URL для Last.fm API
  const lastfmUrl = new URL('http://ws.audioscrobbler.com/2.0/');

  // 3. Копируем ВСЕ параметры из входящего запроса в запрос к Last.fm
  for (const [key, value] of incomingUrl.searchParams.entries()) {
    lastfmUrl.searchParams.append(key, value);
  }

  // 4. (САМОЕ ВАЖНОЕ) Логируем финальный URL, который уйдёт к Last.fm
  console.log('🎯 Proxying to Last.fm:', lastfmUrl.toString());

  try {
    // 5. Делаем запрос к Last.fm
    const response = await fetch(lastfmUrl);
    const data = await response.json();

    // 6. Возвращаем успешный ответ
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    });
  } catch (error) {
    // 7. Возвращаем ошибку
    console.error('❌ Proxy fetch error:', error);
    return new Response(JSON.stringify({ error: 'Proxy fetch failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}