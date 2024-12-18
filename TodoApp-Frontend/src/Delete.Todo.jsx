import { ColorRing } from "react-loader-spinner";
import Swal from "sweetalert2";
import { deleteTodo } from "./redux/reducers/todoSlice";
import { useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";
import { useState } from "react";

export default function DeleteTodo({ id, isEdited, index }) {
  const dispatch = useDispatch();
  const isButtonDisabled = isEdited === index;
  const [loader, setLoader] = useState(null);
  const deleteCurrentTodo = () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        iconColor: "red",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoader(true);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          dispatch(deleteTodo(id));
        }
        setLoader(false);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {loader ? (
        <ColorRing
          visible={true}
          height="25"
          width="25"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      ) : null}
      <MdDelete
        style={{ color: "#dc3545" }}
        className="fs-5"
        onClick={deleteCurrentTodo}
      />
    </>
  );
}