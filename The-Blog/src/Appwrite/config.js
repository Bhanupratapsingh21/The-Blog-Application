import conf from "../Conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ tittle, slug, Content, featuredImage, status, userid }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                JSON.stringify(
                    {
                        
                        tittle,
                        Content,
                        featuredImage,
                        status,
                        userid,
                    }
                )
            );
        } catch (error) {
            console.log('Appwrite Service :: CreatePost : Error', error)
        }

    }

    async updatepost(slug, { tittle, Content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    tittle,
                    Content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatepost ::", error)
        }
    }

    async deletepost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deletepost", error)
        }
    }

    async getpost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getpost", error)
            return false
        }
    }

    async getPosts() {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
            )
        } catch (error) {
            console.log("Appwrite service :: getpost", error)
            return false
        }
    }

    //file upload method's

    async uploadfile(file,) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,

            )

        } catch (error) {
            console.log("appwrite service error :: upload files ", error)
            return false
        }
    }

    async deletefile(fileId) {
        console.log(fileId)
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            return true
        } catch (error) {
            console.log("Appwrite services error :: delete file :: error:", error)
            return false
        }
    }

    getfilepreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId,
        )
    }
}
const service = new Service()
export default service