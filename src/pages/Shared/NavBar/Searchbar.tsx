function Searchbar() {
  return (
    <form
    //   onSubmit={handleSubmit(onSubmit)}
      className="flex items-center justify-between bg-base-100 text-base-200 rounded-full w-[150px] md:w-44"
    >
      <input
        type="text"
        placeholder="Search here..."
        className="w-24 md:w-28 bg-transparent px-3 focus:outline-none"
        // {...register("search", { required: false })}
      />
      <input
        className="bg-secondary/80 hover:bg-secondary text-base-100 px-3 py-1 rounded-full cursor-pointer"
        type="submit"
        value="Search"
      />
    </form>
  );
}

export default Searchbar;
