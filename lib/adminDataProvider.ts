import { DataProvider } from "react-admin";

const apiUrl = "/api/admin";

export const adminDataProvider: DataProvider = {
    getList: async (resource) => {
        try {
            const response = await fetch(`${apiUrl}/${resource}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            return {
                data: Array.isArray(data) ? data : [],
                total: Array.isArray(data) ? data.length : 0,
            };
        } catch (error) {
            console.error(`Error fetching ${resource}:`, error);
            return { data: [], total: 0 };
        }
    },

    getOne: async (resource, params) => {
        try {
            const response = await fetch(`${apiUrl}/${resource}?id=${params.id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            return { data };
        } catch (error) {
            console.error(`Error fetching ${resource} with id ${params.id}:`, error);
            throw error;
        }
    },

    getMany: async (resource, params) => {
        try {
            if (!params.ids || params.ids.length === 0) {
                return { data: [] };
            }
            
            const promises = params.ids.map(async (id) => {
                try {
                    const response = await fetch(`${apiUrl}/${resource}?id=${id}`);
                    if (!response.ok) {
                        console.warn(`Failed to fetch ${resource} with id ${id}`);
                        return null;
                    }
                    return await response.json();
                } catch (error) {
                    console.warn(`Error fetching ${resource} with id ${id}:`, error);
                    return null;
                }
            });
            
            const results = await Promise.all(promises);
            const data = results.filter(item => item !== null);
            
            return { data };
        } catch (error) {
            console.error(`Error in getMany for ${resource}:`, error);
            return { data: [] };
        }
    },

    getManyReference: async (resource, params) => {
        try {
            const response = await fetch(`${apiUrl}/${resource}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            return {
                data: Array.isArray(data) ? data : [],
                total: Array.isArray(data) ? data.length : 0,
            };
        } catch (error) {
            console.error(`Error in getManyReference for ${resource}:`, error);
            return { data: [], total: 0 };
        }
    },

    create: async (resource, params) => {
        const response = await fetch(`${apiUrl}/${resource}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(params.data),
        });
        const data = await response.json();
        
        return { data };
    },

    update: async (resource, params) => {
        const response = await fetch(`${apiUrl}/${resource}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...params.data, id: params.id }),
        });
        const data = await response.json();
        
        return { data };
    },

    updateMany: async (resource, params) => {
        const promises = params.ids.map((id) =>
            fetch(`${apiUrl}/${resource}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...params.data, id }),
            })
        );
        await Promise.all(promises);
        
        return { data: params.ids };
    },

    delete: async (resource, params) => {
        await fetch(`${apiUrl}/${resource}?id=${params.id}`, {
            method: "DELETE",
        });
        
        return { data: params.previousData as any };
    },

    deleteMany: async (resource, params) => {
        const promises = params.ids.map((id) =>
            fetch(`${apiUrl}/${resource}?id=${id}`, {
                method: "DELETE",
            })
        );
        await Promise.all(promises);
        
        return { data: params.ids };
    },
};

