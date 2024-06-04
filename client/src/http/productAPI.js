import { $host, $authHost } from '.';

export const createType = async (type) => {
    const { data } = await $authHost.post('api/type', type);
    return data;
};

export const fetchTypes = async () => {
    const { data } = await $host.get('api/type');
    return data;
};

export const createProduct = async (product) => {
    const { data } = await $authHost.post('api/product', product);
    return data;
};

export const updateProduct = async (id, product) => {
    const { data } = await $authHost.put(`api/product/up/${id}`, product);
    return data;
};

export const delProduct = async (id) => {
    const response = await $authHost.delete(`api/product/del/${id}`);
    return response.data;
};

export const delType = async (id) => {
    const response = await $authHost.delete(`api/type/del/${id}`);
    return response.data;
};

export const updateType = async (id, newData) => {
    const response = await $authHost.put(`api/type/update/${id}`, newData);
    return response.data;
};

export const fetchProducts = async (typeId, page, limit = 5) => {
    const { data } = await $host.get('api/product', {params: {
        typeId, page, limit
    }});
    return data;
};

export const fetchProductsAdmin = async (typeId, page, limit = 5) => {
    const { data } = await $authHost.get('api/product/admin', {params: {
        typeId, page, limit
    }});
    return data;
};

export const fetchOneProduct = async (id) => {
    const { data } = await $host.get('api/product/' + id);
    return data;
};

export const fetchProductsByType = async (typeId) => {
    try {
        const response = await $host.get('api/product/type/' + typeId);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
}}

export const hideProduct = async (id) => {
    const { data } = await $authHost.patch(`api/product/hide/${id}`);
    return data;
};

export const unhideProduct = async (id) => {
    const { data } = await $authHost.patch(`api/product/unhide/${id}`);
    return data;
};


// ------ Корзина ------- //

export const addToBasket = async (productId, quantity) => {
    const { response } = await $authHost.post('api/basket', { productId, quantity });
    return response;
};

export const deleteFromBasket = async (id) => {
    const { data } = await $authHost.delete('api/basket/delete', { data: { id } });
    return data;
};

export const getBasket = async () => {
    const { data } = await $authHost.get('/api/basket');
    return data;
};

export const updateQuantity = async (id, quantity) => {
    const { response } = await $authHost.put('api/basket/update', { id, quantity });
    return response;
};


// ------ Заказы ------- //

export const addOrder = async (id, phone, address) => {
    const {data} = await $host.post('api/order', {
            id, phone, address
        })
    return data
}

export const getOrder = async (id) => {
    const {data} = await $authHost.get('/api/order/')
    return data
}

export const getUserOrder = async (id) => {
    if(!id)id = 0;
    const {data} = await $authHost.get('api/order/user/'+id, id)
    return data
}

export const getUserOrderList = async (id) => {
    if(!id)id = 0;
    const {data} = await $authHost.get('api/order/'+id, id)
    return data
}

export const updateUserOrder = async (id, status) => {
    try {
        const { data } = await $authHost.post(`api/order/user/update/${id}`, { status });
        return data;
    } catch (error) {
        console.error("Failed to update user order:", error);
        throw error;
    }
};

// ------ Обратная связь ------- //

export const submitFeedback = async (formData) => {
    try {
        const response = await $authHost.post('api/feedback', formData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error submitting feedback');
    }
};

// Функция для получения всех обратных связей с сервера
export const getAllFeedback = async () => {
    try {
        const response = await $authHost.get('/api/feedback');
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting feedback');
    }
};

export const deleteFromFeedback = async (id) => {
    const response = await $authHost.delete(`api/feedback/delete/${id}`);
    return response.data;
};





