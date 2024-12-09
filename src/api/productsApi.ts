const BASE_URL = 'https://jsonplaceholder.typicode.com';

let localIdCounter = 102; // апи учебное, добавленная запись не отображается на главном экране, а id этой записи по умолчанию 101, я сделала уникальный id со 102


export async function getAllProducts() {
  const response = await fetch(`${BASE_URL}/posts`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return await response.json();
}


export async function getProductById(productId: number) {
  const response = await fetch(`${BASE_URL}/posts/${productId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product with ID: ${productId}`);
  }
  return await response.json();
}


export async function createProduct(productData: { title: string; body: string; userId?: number }) {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    throw new Error('Failed to create product');
  }

  const serverResponse = await response.json();

  // Добавление уникального локального ID к данным для приложения
  const uniqueId = localIdCounter++;
  return { ...serverResponse, id: uniqueId };
}

export async function deleteProduct(productId: number) {
  const response = await fetch(`${BASE_URL}/posts/${productId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete product with ID: ${productId}`);
  }

  return { success: true };
}