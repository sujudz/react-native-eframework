//
//  BaseViewController.h
//  app
//
//  Created by suju suju on 2019/6/2.
//  Copyright © 2019 suju suju. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface BaseViewController : UIViewController

-(void) setViewAlpha:(CGFloat) alpha;
-(void) loadReactProject:(NSString*) name :(UIView*) container;
-(void) loadReactProjectWithProperties:(NSString*) name :(UIView*) container :(NSDictionary *)initialProperties;
@end

NS_ASSUME_NONNULL_END
