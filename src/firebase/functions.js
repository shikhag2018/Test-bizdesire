
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from '../config/firebase'
import { collection, addDoc,getDocs,query } from "firebase/firestore";
import moment from "moment";

const uploadFilesAndGetURLs = async (files) => {
    let alldocs = []
    const filePromises = [];

    // Iterate over the files and create a promise for each upload
    files.forEach((file) => {
        const storageRef = ref(storage, "folder/" + file.document[0].name);
        const uploadTask = uploadBytes(storageRef, file.document[0].originFileObj)
            .then(() => getDownloadURL(storageRef))
            .then((url) => {
                console.log(`File ${file.name} uploaded successfully. Download URL: ${url}`)
                return url
            })
            .catch((error) => {
                console.error(`Error uploading file ${file.name}:`, error);
            });

        filePromises.push(uploadTask);
    });

    try {
        // Wait for all the uploads and URL retrievals to complete
        alldocs = await Promise.all(filePromises);
        console.log("All files uploaded successfully!");
        return alldocs

    } catch (error) {
        console.error("Error uploading files:", error);
    }
}


export const saveData = async (values) => {   // Save form data to Firestore
    // Upload images to Firebase Storage and save URLs in Firestore
    try {

        let data = {
            ...values,
            dateOfBirth: moment(values?.dateOfBirth).format(),
        }

        const { uploadDocuments } = values
        const alldocs = await uploadFilesAndGetURLs(uploadDocuments)

        delete data.uploadDocuments;

        await addDoc(collection(db, "candidates"), {
            ...data,
            imageUrls: uploadDocuments.map((d, i) => {
                return {
                    fileName: d?.fileName,
                    fileType: d?.fileType,
                    docUrl: alldocs[i]
                }
            }),
        });

    } catch (error) {
        console.error('Error uploading images and saving URLs:', error);
    }
}

export const fetchData = async () => {
    try {
        let candidates=[]
        const querySnapshot = await getDocs(query(collection(db, "candidates")));
        // console.log(querySnapshot,"hhjjh")
        querySnapshot.forEach((doc) => {
           candidates.push(doc.data())
        });
        return candidates
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
