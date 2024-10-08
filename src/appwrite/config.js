import { Client, ID, Databases, Storage, Query } from "appwrite";
import config from "../config/config";

export class Service {
  client = new Client();
  database;
  bucket;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async createPost({ title, slug, content, status, userId, featuredImage }) {
    try {
      return await this.database.createDocument(
        config.appwriteDataBaseId,
        config.appwriteCollectionId,
        slug,
        { title, featuredImage, content, status, userId }
      );
    } catch (error) {
      throw error;
    }
  }
  async updatePost(slug, { title, featuredImage, userId, content, status }) {
    try {
      return await this.database.updateDocument(
        config.appwriteDataBaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async deletePost(slug) {
    try {
      return await this.database.deleteDocument(
        config.appwriteDataBaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }
  async getpost() {
    try {
      return await this.database.getDocument(
        config.appwriteDataBaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }
  async getposts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        config.appwriteDataBaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      throw error;
    }
  }

  //file upload
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      throw error;
    }
  }
  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(config.appwriteBucketId, fileId);
    } catch (error) {
      throw error;
    }
  }
  async getFilePreview(fileId) {
    try {
      return await this.bucket.getFilePreview(config.appwriteBucketId, fileId);
    } catch (error) {
      throw error;
    }
  }
}
const service = new Service();
export default service;
