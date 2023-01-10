'use strict';

const baseUrl = 'https://jsonplaceholder.typicode.com';
class Post {
  constructor(userId, id, title, body) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.body = body;
  }
}

class EnrichedPost extends Post {
  constructor(post) {
    super(post.id, post.userId, post.title, post.body);
  }

  async addUser() {
    // hack for https://jsonplaceholder.typicode.com/users
    // userIds above 10 are 404
    let normalizedUserId = this.userId;
    if (normalizedUserId > 10) {
      normalizedUserId = Math.floor(this.userId / 10);
    }
    const user = await fetch(`${baseUrl}/users/${normalizedUserId}`);
    this.author = await user.json();
  }
}

let pageSize = 10;
let currentPage = 1;
let postData = [];

const renderTable = function () {
  postData.map((row, index) => {
    const start = (currentPage - 1) * pageSize;
    const end = currentPage * pageSize;

    if (index >= start && index < end) return true;
    // console.log(postData);
  });
};
renderTable();

async function processPosts(posts) {
  const enrichedPosts = [];
  for (let post of posts) {
    const enrichedPost = new EnrichedPost(post);
    await enrichedPost.addUser();
    enrichedPosts.push(enrichedPost);
  }
  return enrichedPosts;
}

const request = async function () {
  const allPosts = await (await fetch(`${baseUrl}/posts`)).json();
  const enrichedPosts = await processPosts(allPosts);

  let placeholder = document.querySelector('#data');
  let tableData = '';

  for (let post of enrichedPosts) {
    tableData += `
            <tr>
                <td>${post.title}</td>
                <td>${post.body}</td>
                <td>458</td>
                <td>${post.author.name}</td>
            </tr>
            `;
  }

  placeholder.innerHTML = tableData;
};
request();

// postData.map((row, index) => {
//   const start = (currentPage - 1) * pageSize;
//   const end = currentPage * pageSize;

//   if (index >= start && index < end) return true;
//   console.log(postData);
// });

/**
 * pseudo
 *
 * const allPosts = await fetch(postsUrl); // format as array if not already one
 * Enrich posts data by adding the Author details: Implement a class EnrichedPost
 * const postsPerPage = getCurrentValueOfSelectListCalledShow()
 * const numberOfPages = ceil(allPostsLength / postsPerPage)
 * You now know how many page navigation buttons to create (1 2 3 4)
 * Implement pagination button clicks: If I click page 2, I get next page. Also Prev and Next.
 *   Note: Prev/Next should be disabled depending on the end of list.
 * Update page when user changes number of items to show. This updates: Pagination buttons and table
 * Default items to show is 50
 * Disclaimer! Do not refetch posts when page updates.
 * Implement word count.
 */
