const companyURL = `https://acme-users-api-rev.herokuapp.com/api/companies`;
const productURL = 'https://acme-users-api-rev.herokuapp.com/api/products';

const companyLink = document.querySelector('#companiesLink');
const productLink = document.querySelector('#productsLink');
const table = document.querySelector('#data');
const title = document.querySelector('#title');

const loadData = async () => {
  const responses = await Promise.all(
    [
      axios(companyURL),
      axios(productURL),
    ]
  );

  const [ companies, products ] = await Promise.all(responses.map(response => response.data));

  companyLink.innerHTML = `Companies (${companies.length})`;
  productLink.innerHTML = `Products (${products.length})`;

  if(window.location.hash === '#companies') {
    render(companies);
  } else if (window.location.hash === '#products') {
    render(products);
  }
};

const render = (views) => {
  const pageTitleHash = window.location.hash.slice(1);
  const pageTitle = pageTitleHash.charAt(0).toUpperCase() + pageTitleHash.slice(1);
  console.log(pageTitle);
  const headings = Object.keys(views[0]);
  const tableHeadings = `
    <tr>
      ${
        headings.map(heading => `<th>${heading}</th>`).join('')
      }
    </tr>
  `;
  const data = views.map(view => {
    return `
      <tr>
        ${
          headings.map(heading => {
            return `
              <td>${view[heading]}</td>
            `
          }).join('')
        }
      </tr>
    `;
  }).join('');
  title.innerHTML = pageTitle;
  table.innerHTML = `${tableHeadings} ${data}`;
}

window.addEventListener('load', () => {
  let hash = window.location.hash;
  if(!hash){
    window.location.hash = '#companies';
  } else {
    loadData();
  }
});

window.addEventListener('hashchange', () => {
  let hash = window.location.hash;
  if(hash === '#companies') {
    loadData();
  } else if (hash === '#products') {
    loadData();
  }
});
