export const DEFAULT_PAGE_SIZE = 200;
export const findAndReplaceModalTitle = (title: string) => {

    if(!title)return;
    let search = setInterval(function() {
      const titleSpan = document.querySelector('span.p-dialog-title');
      if(titleSpan){
        titleSpan.innerHTML = title;
        // const text = document.createTextNode(title);
        // titleSpan.appendChild(text);
        clearInterval(search);
      }
    },50)
    setTimeout(() => {
      clearInterval(search);
    }, 5000);
    // let titleNotFound = true;
    // if(!title) return;
    // let count = 0;
    // while (titleNotFound && count < 100){
  
    //   count++;
    //   console.log('title not found ...'+ count)
  
    // }
  }