/**
 * @format
 */

import {AppRegistry, NativeModules} from 'react-native';
import App from './App';
import categoryCourse from './category';
import course from './course';
import exam from './exam';
import discuss from './discuss';
import user from './user';
import courseDetail from './course_detail';
import login from './view/login';
import regist from './view/regist';
import pay from './view/PayView';
import courseLessonView from './view/CourseLessonsView';
import payCenterView from './view/PayCenterView';
import lessonView from './view/LessonView';
import webProjectView from './view/WebProjectView';
import selectCategoryView from './view/SelectCategoryView';
import courseReviewsView from './view/CourseReviewsView';
import courseReviewAddView from './view/CourseReviewAddView';
import imagePrevView from './components/ImagePrevView';
import addAdressView from './view/AddAdressView';


import {name as appName} from './app.json';
import Config from './model/Config'

AppRegistry.registerComponent(appName, () => App);

AppRegistry.registerComponent("CourseProject", () => course);
AppRegistry.registerComponent("CourseReviewsProject", () => courseReviewsView);
AppRegistry.registerComponent("AddAdressViewProject", () => addAdressView);
AppRegistry.registerComponent("ImagePrevProject", () => imagePrevView);
AppRegistry.registerComponent("CourseReviewAddProject", () => courseReviewAddView);
AppRegistry.registerComponent("CategoryProject", () => categoryCourse);
AppRegistry.registerComponent("DiscussProject", () => discuss);
AppRegistry.registerComponent("ExamProject", () => exam);
AppRegistry.registerComponent("UserProject", () => user);
AppRegistry.registerComponent("courseDetailProject", () => courseDetail);
AppRegistry.registerComponent("LoginProject", () => login);
AppRegistry.registerComponent("PayProject", () => pay);
AppRegistry.registerComponent("LessonProject", () => lessonView);
AppRegistry.registerComponent("CourseLessonProject", () => courseLessonView);
AppRegistry.registerComponent("WebProject", () => webProjectView);
AppRegistry.registerComponent("PayCenterProject", () => payCenterView);
AppRegistry.registerComponent("SelectCategoryProject", () => selectCategoryView);

new Config().getCurrentCategory().then(category => {
	if (!category) {
		NativeModules.Navigation.modalView(
			'SelectCategoryProject', {}
		);
	}
});