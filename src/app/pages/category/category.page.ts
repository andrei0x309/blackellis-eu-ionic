import { Component, OnInit } from '@angular/core';
import { GlobalStore } from '../../store/globalStorage.service'
import { Storage } from "@ionic/storage";
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-category',
  templateUrl: 'category.page.html',
  styleUrls: ['category.page.scss'],
})
export class CategoryPage implements OnInit{


  private cacheTime: number = 60000;
  public loadMoreNr: number = 1;
  public loadMoreContent = [];
  public hideLoadMoreButton: boolean = false;
  public isLoadingContent: boolean = false;
  public catId: number;
  public catTitle;



  debug: { errorStatus: string, errorMessage: string } = {
    errorStatus: '',
    errorMessage: '',
  }


  constructor(public globalStore: GlobalStore,
              private storage: Storage,
              private toastCtrl: ToastController,
              private route: ActivatedRoute,
              ) {}

 
ngOnInit(){
  

  this.route.paramMap.subscribe(params => {
    this.catId = Number(params.get('id')).valueOf();
  });

  this.catTitle = this.globalStore.getBlogCatByid(this.catId).title;
 
}


afterFetchImgSourceUrl(fetchData){
  return fetchData.json().then(
    (data) => {
      let source_url = data.source_url;
      return (source_url) ? source_url : 0;
    }

  )
}
 
//this.http.get('https://blackellis.ro/wp-json/wp/v2/posts/?categories='+  this.passedObject.id , {}, {})
//	this.http.get('https://blackellis.ro/wp-json/wp/v2/posts/?categories='+  this.passedObject.id +'&page=' + (this.loadMoreNr+1) , {}, {})              
ionViewDidEnter() {

 

  if (this.timeExpired()) {

    fetch(`https://${this.globalStore.getBlogDomain()}/wp-json/wp/v2/posts/?categories=${this.catId}`)
      .then(async data => {

        // set a key/value
        this.storage.set('lastPost_JsonFeed', this.globalStore.catGetLastPostJsonFeed(this.catId));
        this.storage.set('lastPost_time', this.globalStore.catGetLastPostTime(this.catId));
        this.storage.set('lastPost_reqStatus', this.globalStore.catGetLastPostReqStatus(this.catId));

        let feed = await data.json();
        feed.forEach(async element => {
          
          element.title.final  = this.decodeHtml(element.title.rendered);
          element.excerpt.final  = this.removeHtmlFromExcerpt(this.decodeHtml(element.excerpt.rendered));
          element.featured_image = 0;
         
          if (element.featured_media > 0) {
            fetch(`https://${this.globalStore.getBlogDomain()}/wp-json/wp/v2/media/${element.featured_media}`).then(
             (data) => {
               this.afterFetchImgSourceUrl(data).then(
                (img) => {
                  element.featured_image = this.featuredImgOptimzeMobile(img);
                }

              );
              
              
             }
            );
          } else {
            element.featured_image = 0;
          }
          
        });

        this.globalStore.catSetLastPostJsonFeed(this.catId, feed);
        this.globalStore.catSetLastPostTime(this.catId, Date.now());
        this.globalStore.catSetLastPostReqStatus(this.catId, data.status);
 

        // console.log(data.status);
        //console.log(feed); // data received by server
        //console.log(data.headers);

      })
      .catch(error => {

        this.debug.errorStatus = error.status;
        this.debug.errorMessage = error.error;

        //this.globals.setLastPostReqStatus(55);
        //console.log(error.status);
        //console.log(error.error); // error message as string
        //console.log(error.headers);

      });

    setTimeout(() => {
      if (this.globalStore.catGetLastPostReqStatus(this.catId) == 0) {
        this.globalStore.catSetLastPostReqStatus(this.catId, 600);
      }
    }, 7000);

  }

}


featuredImgOptimzeMobile(img: String) {
  // Image isn't fetched yet
  if (img === undefined) return;
  img = String(img);
  // No Featured Image in the post :(
  if (img === '0') return "https://lh3.googleusercontent.com/pw/ACtC-3dIDtGu7X0C5rqT0bXUcp_zRIdGGL0PQqywSm6fQhxP-KGV3klsY6Tp8LVvhie-xi24eueKQ7vdvBP1mg0MGanHqhW8hmgKE6b-H-KbxuXjvpn3DrDa6bxNg2Y3hbbK3nLsbFOlYtnEX9QXhcjq--Fu=s473-no"
  // Featured Image is hosted locally can't resize on the fly :(
  if (img.toLocaleLowerCase().includes(this.globalStore.getBlogDomain().toLocaleLowerCase())) return img;
  // Image is hosted on Photos CDN
  let imgW = img.match(/=w|=s|=W|=S/);
  // Resize image on fly 
  if (imgW !== null) {
    let posOfSize = img.indexOf(imgW[0]);
    //console.log(posOfSize)
    return `${img.substring(0, posOfSize)}=w420`;
  } else {
    return `${img}=w420`;
  }
}



loadMore() {

  //this.http.get('https://blackellis.ro/wp-json/wp/v2/posts/?page=' + (this.loadMoreNr + 1), {}, {})
  fetch(`https://${this.globalStore.getBlogDomain()}/wp-json/wp/v2/posts/?categories=${this.catId}&page=${this.loadMoreNr + 1}`)
  .then(async data => {

    let feedData = await data.json();
  
    if (feedData.length > 0 && data.ok && feedData !== undefined ) {

      feedData.forEach(async element => {
        
        element.title.final  = this.decodeHtml(element.title.rendered);
        element.excerpt.final  = this.removeHtmlFromExcerpt(this.decodeHtml(element.excerpt.rendered));
        element.featured_image = 0;
       
        if (element.featured_media > 0) {
          fetch(`https://${this.globalStore.getBlogDomain()}/wp-json/wp/v2/media/${element.featured_media}`).then(
           (data) => {
             this.afterFetchImgSourceUrl(data).then(
              (img) => {
                element.featured_image = this.featuredImgOptimzeMobile(img);
              }

            );
            
            
           }
          );
        } else {
          element.featured_image = 0;
        }
        
      });

      let reciveidData = { jsonFeed: <any>[], reqStatus: <number>0 };
      reciveidData.jsonFeed = feedData;
      reciveidData.reqStatus = data.status;
      this.loadMoreNr = this.loadMoreNr + 1;
      this.loadMoreContent.push(reciveidData);
      this.isLoadingContent = false;
      this.hideLoadMoreButton = false;
    } else {
      await this.toastNoMorePost();
    }

  })
  .catch(async error => {
    console.log(error);
    await this.toastNoMorePost();
  });
setTimeout(() => {
  if (this.globalStore.getLastPostReqStatus() == 0) {
    this.globalStore.setLastPostReqStatus(600);
  }
}, 7000);
}

async toastNoMorePost(){
this.hideLoadMoreButton = true;
this.isLoadingContent = false;
let toast = await this.toastCtrl.create({
  message: 'There are no more articles.',
  duration: 2500,
  position: 'middle'
});

toast.present();
}


timeExpired() {
  if ((this.globalStore.catGetLastPostTime(this.catId) + this.cacheTime) < Date.now()) {
    return true;
  } else
    return false;
}

 

decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

removeHtmlFromExcerpt(txt: String) {
  return txt.replace('<p>', "").replace('</p>', "").replace(/<a .*/gi, '');
}

removeTimefPostDate(date: String){
  return date.replace('T', ' ').replace(/ .*/, '');
}




tryAgain() {
  this.ionViewDidEnter();
}


}