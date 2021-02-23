import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {CourseActions} from './action-types';
import {concatMap, map, tap} from 'rxjs/operators';
import {CoursesHttpService} from './services/courses-http.service';
import {allCoursesLoaded} from './course.actions';

@Injectable()
export class CoursesEffects {

  constructor(private actions$: Actions,
              private coursesHttpService: CoursesHttpService) {
  }

  loadCourses$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(CourseActions.loadAllCourses),
        concatMap(action =>
          this.coursesHttpService.findAllCourses()),
        map(courses => allCoursesLoaded({courses}
        )
      )
  )
  );

  saveCourses$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(CourseActions.courseUpdated),
        concatMap(action => this.coursesHttpService.saveCourse(
          action.update.id,
          action.update.changes
        ))
      ),
    {dispatch: false}
  );
}
