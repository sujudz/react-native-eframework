//
//  ReactBridgeManager.h
//  app
//
//  Created by suju suju on 2019/6/4.
//  Copyright © 2019 suju suju. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridge.h>
#import <React/RCTBridgeDelegate.h>

NS_ASSUME_NONNULL_BEGIN

@interface ReactBridgeManager : NSObject
+ (ReactBridgeManager*)shareInstance;

- (RCTBridge*) getBridge;
@end

@interface BridgeHandle : NSObject<RCTBridgeDelegate>

@end

NS_ASSUME_NONNULL_END
