
const TopRatedRecipe = () => {
  return (
      <article className="text-center">
      <a
        className="block md:hover:opacity-60 flex flex-col h-full"
        href="https://pinchofyum.com/recipes/quick-and-easy"
      >
        <img
          className="object-cover self-center w-44 h-44 md:w-full md:h-full top_rated_image"
          src="/images/cocolate_bar.jpeg"
          alt="blog"
        ></img>
        <p className="relative -mt-4 px-2 sm:px-6 py-2 mx-auto text-white bg-orange-500 text-xxs sm:text-xs font-bold uppercase tracking-extra-widest sm:tracking-giant">
          Chocolate bar
        </p>
      </a>
    </article>
  )
}

export default TopRatedRecipe