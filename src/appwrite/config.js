import conf from '../conf/conf'
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    database;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.database = new Databases(this.client); // This is to deal with Post table.
        this.bucket = new Storage(this.client); // This is to deal with Store.
    }

    // Creating POST(ARTICLE)
    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            // featuredImage will be returned number after storing image in BUCKET 
            return await this.database.createDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                slug,
                {
                    title,
                    content,
                    featuredImage, 
                    status, 
                    userId
                }
            );
        } catch (error) {
            console.log("Appwrite >> config >> service :: createPost :: ERROR ", error);
            return false;
        }
    }

    // Updating POST(ARTICLE)
    async updatePost({title, slug, content, featuredImage, status}){
        try {
            // featuredImage will be returned number after storing image in BUCKET 
            return await this.database.updateDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                slug,
                {
                    title,
                    content,
                    featuredImage, 
                    status
                }
            );
        } catch (error) {
            console.log("Appwrite >> config >> service :: updatePost :: ERROR ", error);
            return false;
        }
    }

    // Deleting POST(ARTICLE)
    async deletePost(slug){
        try {
            await this.database.deleteDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                slug
            )

            return true;
        } catch (error) {
            console.log("Appwrite >> config >> service :: deletePost :: ERROR ", error);
            return false;
        }
    }

    // Getting Single POST(ARTICLE)
    async getPost(slug){
        try {
            return await this.database.getDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                slug
            )
        } catch (error) {
            console.log("Appwrite >> config >> service :: getPost :: ERROR ", error);
            return false;
        }
    }

    // Getting All POST(ARTICLE)
    async getPosts(queries = [Query.equal("active")]){
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                queries
            )
        } catch (error) {
            console.log("Appwrite >> config >> service :: getPosts :: ERROR ", error);
            return false;
        }
    }

    // ------------------------------------------- Article CRUD Functionality END Here --------------------------------------

    

    // ------------------------------------------- File Upload Service START Here ------------------------------------------

    // Upload File
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId, 
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite >> config >> service :: uploadFile :: ERROR ", error);
            return false;
        }
    }

    // Delete File 
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId, 
                ID.unique(),
                fileId
            );

            return true;
        } catch (error) {
            console.log("Appwrite >> config >> service :: deleteFile :: ERROR ", error);
            return false;
        }
    }

    // Get File Preview 
    getFilePreview(fileId){
        try {
            return this.bucket.getFilePreview(
                conf.appwriteBucketId, 
                ID.unique(),
                fileId // This we will pass when we will call this function, this will be the stored image ID
            );
        } catch (error) {
            console.log("Appwrite >> config >> service :: getFilePreview :: ERROR ", error);
            return false;
        }
    }

    // --------------------------------------- Document or File CRUD Functionality END Here ----------------------------------

}

const service = new Service();

export default service;