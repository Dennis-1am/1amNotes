import db from './firebase.js'
import { collection, addDoc, getDocs, getDoc, deleteDoc, doc, updateDoc, where, query} from "firebase/firestore";

async function addNewNote(post) {

  const docRef = await addDoc(collection(db, "notes"), post);

  return docRef.id;
}

async function getNotes() {
  const querySnapshot = await getDocs(collection(db, "notes"));
  let notes = [];
  querySnapshot.forEach((doc) => {
    notes.push({ ...doc.data(), id: doc.id });
  });
  return notes;
}

// get a note by id
async function getNoteById(id) {
  const docRef = doc(db, "notes", id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();

  if (docSnap && docSnap.data()) {
    id = docSnap.id;
    const date = data.published_date;
    const title = data.title;
    const body = data.body;
    const likes = data.likes;
    const comments = data.comments;
    return { id, date, title, body, likes, comments};
  } else {
    return null; // or handle the non-existence case as needed
  }
}

// update the like count for a note
async function updateLikeCount(id, count) {
  const noteRef = doc(db, "notes", id);
  await updateDoc(noteRef, {
    likes: count
  });
}

async function updatePost(obj) {
  try {
    const noteRef = doc(db, "notes", obj.id);
    await updateDoc(noteRef, {
      title: obj.title,
      body: obj.body
    });
    console.log("Post updated successfully");
  } catch (error) {
    console.error("Error updating post:", error);
    // You might want to throw the error again if you want to propagate it
    // throw error;
  }
}


// partial match search for notes
async function searchNotes(searchText) {
  const q = query(collection(db, "notes"), where("title", ">=", searchText), where("title", "<=", searchText + '\uf8ff'));
  const querySnapshot = await getDocs(q);

  let notes = [];
  querySnapshot.forEach((doc) => {
    notes.push({ ...doc.data(), id: doc.id });
  });
  return notes;
}

// add comments to a notes comments array
async function addComment(id, comment) {
  const noteRef = doc(db, "notes", id);
  await updateDoc(noteRef, {
    comments: comment
  });
}

// delete a note
async function deleteNoteById(id) {
  await deleteDoc(doc(db, "notes", id));
}


const dbFunctions = {
  addNewNote,
  getNotes,
  updateLikeCount,
  searchNotes,
  getNoteById,
  addComment,
  updatePost,
  deleteNoteById
};

export default dbFunctions;