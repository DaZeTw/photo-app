import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Comment {
  _id: string;
  photoId: string;
  text: string;
}

interface NewComment {
  text: string;
}

interface CommentsState {
  commentsByPostId: Record<string, Comment[]>;
  fetchAndSetCommentsByPost: (postId: string) => Promise<void>;
  addComment: (postId: string, newComment: NewComment) => Promise<void>;
}

export const useCommentsStore = create<CommentsState>()(
  devtools(
    persist(
      (set, get) => ({
        commentsByPostId: {},
        fetchAndSetCommentsByPost: async (photoId: string) => {
          try {
            const response = await fetch(
              `http://localhost:3000/api/comments/${photoId}`
            );
            if (!response.ok) {
              throw new Error(
                "Failed to fetch comments for photoId: " + photoId
              );
            }

            const data = await response.json();
            const comments = data.comment;
            set((state) => ({
              commentsByPostId: {
                ...state.commentsByPostId,
                [photoId]: comments,
              },
            }));
          } catch (error) {
            console.error("Fetch error:", error);
          }
        },
        addComment: async (photoId: string, newComment: NewComment) => {
          try {
            const response = await fetch(`http://localhost:3000/api/comments`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },

              body: JSON.stringify({ photoId, text: newComment.text }),
            });
            if (!response.ok) {
              throw new Error("Failed to add comment");
            }

            const addedComment = await response.json();
            console.log(addedComment.message);

            await get().fetchAndSetCommentsByPost(photoId);
          } catch (error) {
            console.error("Add comment error:", error);
          }
        },
      }),
      {
        name: "comments-store",
        getStorage: () => localStorage,
      }
    )
  )
);
