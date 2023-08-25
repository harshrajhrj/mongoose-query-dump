const temporary = require("./temporary");
await temporary.findByIdAndUpdate(
    req.params.id,
    [
        {
            $set: {
                platforms: {
                    $cond: {
                        if: {
                            $in: [platform.platform, '$platforms.platform']
                        },
                        then: {
                            $map: {
                                input: '$platforms',
                                as: 'platformItem',
                                in: {
                                    $cond: {
                                        if: { $eq: ['$$platformItem.platform', platform.platform] },
                                        then: {
                                            platform: platform.platform,
                                            url: platform.url
                                        },
                                        else: '$$platformItem'
                                    }
                                }
                            }
                        },
                        else: {
                            $concatArrays: [
                                '$platforms',
                                [platform]
                            ]
                        }
                    }
                }
            }
        }
    ]
)

// OR

await temporary.findByIdAndUpdate(
    req.params.id,
    [
        {
            $set: {
                platforms: {
                    $cond: {
                        if: {
                            $in: [platform.platform, '$platforms.platform']
                        },
                        then: {
                            $map: {
                                input: '$platforms',
                                in: {
                                    $cond: [
                                        {
                                            $eq: ['$$this.platform', platform.platform]
                                        },
                                        {
                                            $mergeObjects: ['$$this', {
                                                platform: platform.platform,
                                                url: platform.url
                                            }]
                                        },
                                        '$$this'
                                    ]
                                }
                            }
                        },
                        else: {
                            $concatArrays: [
                                '$platforms',
                                [platform]
                            ]
                        }
                    }
                }
            }
        }
    ]
)

// OR

await temporary.findByIdAndUpdate(
    req.params.id,
    {
        $set: { 'platforms.$[elem].url': platform.url },
        $addToSet: {
            platforms: {
                $each: [
                    {
                        $cond: {
                            if: { $not: { $in: [platform.platform, '$platforms.platform'] } },
                            then: platform,
                            else: {
                                platform: platform.platform
                            }
                        }
                    }
                ]
            }
        }
    },
    {
        arrayFilters: [{ 'elem.platform': platform.platform }]
    }
)