function PostForm({ onFormSubmit, methods, onFormReset }) {
    const { register, handleSubmit, formState: { errors } } = methods;
    return (
        <div>
            <h3>Add/Update post</h3>
            <form onSubmit={handleSubmit(onFormSubmit)} className="post-form">
                <input type="hidden" {...register("id")} />

                <label htmlFor="title">Title</label>
                <input type="text" {...register("title", { required: true, maxLength: 30 })} />
                {errors.title && <p style={{ color: 'red' }}>Title is required and max maxLength can't exceed 30</p>}
                <button type="submit">Submit</button>
                <button type="button" onClick={onFormReset}>Reset</button>
            </form>
        </div>
    );
}

export default PostForm