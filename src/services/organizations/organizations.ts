import axiosInstance, { baseURL } from '@/apiConfigs/axiosInstance';
import { createOrganizationPayload } from './types';

export class OrganizationsService {
  // Create Organizations
  static async createOrganizations(payload: createOrganizationPayload) {
    try {
      const res = await axiosInstance.post(`${baseURL}/organizations`, payload);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}
