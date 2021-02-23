import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {loadAllCourses} from './course.actions';
import {filter, finalize, first, tap} from 'rxjs/operators';
import {areCoursesLoaded} from './courses.selectors';

@Injectable()


export class CoursesResolver implements Resolve<any> {
  constructor(private store: Store<AppState>) {
  }
  loading = false;
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    // check if store already has courses data


    // get courses data
    return this.store
      .pipe(
        select(areCoursesLoaded),
        tap(coursesLoaded => {
          if (!this.loading && !coursesLoaded) {
            this.loading = true;
            this.store.dispatch(loadAllCourses());
          }
        }),
        filter(coursesLoaded => coursesLoaded),
        first(),
        finalize(() => this.loading = false)
      );

  }
}
