'use server'

import { getUserInfo } from "@/lib/auth-utils"

export const getSessionData = async () => {
    try {
        const response = await getUserInfo();
        return response
      
    } catch (error) {
        console.error('Error creating subscription:', error);
        throw error;
    }
}
