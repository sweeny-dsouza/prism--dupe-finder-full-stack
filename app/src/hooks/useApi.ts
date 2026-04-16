import { useState, useEffect } from 'react';
import type { Product, Ingredient, SkinConcern, HairConcern } from '@/types';

export const API_BASE_URL = 'http://localhost:5000/api';

export function useProducts(category?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
        try {
            setLoading(true);
            const url = category ? `${API_BASE_URL}/products?category=${category}` : `${API_BASE_URL}/products`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch products');
            const data = await response.json();
            setProducts(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    fetchProducts();
  }, [category]);

  return { products, loading, error };
}

export function useIngredients() {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      async function fetchIngredients() {
          try {
              const response = await fetch(`${API_BASE_URL}/ingredients`);
              if (!response.ok) throw new Error('Failed to fetch ingredients');
              const data = await response.json();
              setIngredients(data);
          } catch (err) {
              console.error(err);
          } finally {
              setLoading(false);
          }
      }
      fetchIngredients();
    }, []);
  
    return { ingredients, loading };
}

export function useConcerns(type?: 'skin' | 'hair' | 'body') {
    const [concerns, setConcerns] = useState<(SkinConcern | HairConcern | any)[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      async function fetchConcerns() {
          try {
              const url = type ? `${API_BASE_URL}/concerns?type=${type}` : `${API_BASE_URL}/concerns`;
              const response = await fetch(url);
              const data = await response.json();
              setConcerns(data);
          } catch (err) {
              console.error(err);
          } finally {
              setLoading(false);
          }
      }
      fetchConcerns();
    }, [type]);
  
    return { concerns, loading };
}

export async function createOrder(orderData: any) {
    try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });
        return await response.json();
    } catch (err) {
        console.error('Error creating order:', err);
        throw err;
    }
}

export function useProduct(id: string | undefined) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      if (!id) return;
      async function fetchProduct() {
          try {
              setLoading(true);
              const response = await fetch(`${API_BASE_URL}/products/${id}`);
              if (!response.ok) throw new Error('Failed to fetch product');
              const data = await response.json();
              setProduct(data);
          } catch (err) {
              console.error(err);
          } finally {
              setLoading(false);
          }
      }
      fetchProduct();
    }, [id]);
  
    return { product, loading };
}
