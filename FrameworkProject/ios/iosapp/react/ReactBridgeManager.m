//
//  ReactBridgeManager.m
//  app
//
//  Created by suju suju on 2019/6/4.
//  Copyright © 2019 suju suju. All rights reserved.
//

#import "ReactBridgeManager.h"
#import <React/RCTBridgeDelegate.h>
#import <React/RCTBundleURLProvider.h>

@interface ReactBridgeManager ()

@end

@implementation BridgeHandle

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
    [[RCTBundleURLProvider sharedSettings] setJsLocation:@"127.0.0.1"];
    return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
    return [[NSBundle mainBundle] URLForResource:@"index" withExtension:@"jsbundle"];
#endif
}

@end

@implementation ReactBridgeManager

static ReactBridgeManager * manager = nil;
static RCTBridge * bridge = nil;
static dispatch_once_t onceToken;

+ (ReactBridgeManager*)shareInstance
{
    dispatch_once(&onceToken,^{
        bridge = [[RCTBridge alloc] initWithDelegate:[[BridgeHandle alloc] init] launchOptions:@{}];
        manager = [[ReactBridgeManager alloc] init];
    });
    return manager ;
}

- (RCTBridge*) getBridge {
    return bridge;
}

@end
