/* eslint-disable linebreak-style */
const dummy = (blogs) => {
  return 1

}



const totalLikes = (blogList) => {

  const sumLikes = (sum, blog) =>{
    console.log (sum)
    return sum + blog.likes
  }

  return blogList.lenght === 0 ? 0 : blogList.reduce(sumLikes, 0)

}


const favouriteBlog = (blogList) => {


        return blogList.lenght === 0 ? {} : blogList.reduce((maxLikeBlog, blog) => blog.likes>maxLikeBlog.likes ? blog : maxLikeBlog)

      }




module.exports = { dummy, totalLikes, favouriteBlog  }
