import { content } from './../classes/content';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(
    private httpClient:HttpClient
  ) { }

  getContent(): Observable<any>{
      return this.httpClient.get('http://latestgist.atwebpages.com/wp-json/wp/v2/posts')
  };

  deletePost(id){
    const deleEndPoint = "http://latestgist.atwebpages.com/wp-json/wp/v2/posts/" + id;
    return this.httpClient.delete(deleEndPoint)
  };

  editPost( editId, updatedInfo){
    const editEndPoint = "http://latestgist.atwebpages.com/wp-json/wp/v2/posts/" + editId;
    return this.httpClient.put(editEndPoint, updatedInfo);
  };
}
