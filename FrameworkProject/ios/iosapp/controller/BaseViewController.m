//
//  BaseViewController.m
//  app
//
//  Created by suju suju on 2019/6/2.
//  Copyright © 2019 suju suju. All rights reserved.
//

#import "BaseViewController.h"
#import <React/RCTRootView.h>
#import "../react/ReactBridgeManager.h"

@interface BaseViewController ()
@property (strong, nonatomic) RCTRootView *rootView;
@end

@implementation BaseViewController

- (void)viewDidLoad {
    [super viewDidLoad];
}

- (void)loadReactProjectWithProperties:(NSString *)name: (UIView *) container: (NSDictionary *) initialProperties {
    _rootView = [[RCTRootView alloc] initWithBridge:[[ReactBridgeManager shareInstance] getBridge]
                                         moduleName:name
                                  initialProperties:initialProperties];
    CGRect containerRect = container.frame;
    
    containerRect.origin.y = containerRect.origin.y + [self getRectNavAndStatusHight];
    containerRect.size.height = containerRect.size.height - [self getRectNavAndStatusHight];
    [_rootView setFrame:containerRect];
    [container addSubview:_rootView];
}

- (void)loadReactProject:(NSString *)name: (UIView *) container {
    [self loadReactProjectWithProperties:name :container :nil];
}

- (CGFloat)getRectNavAndStatusHight {
    CGRect statusRect = [[UIApplication sharedApplication] statusBarFrame];
    return statusRect.size.height;
}

- (void)setViewAlpha:(CGFloat)alpha {
    self.view.backgroundColor = [UIColor colorWithWhite:0 alpha:alpha];
    _rootView.backgroundColor = [UIColor colorWithWhite:0 alpha:alpha];
}

@end
