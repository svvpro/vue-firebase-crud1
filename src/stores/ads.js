import * as fbs from 'firebase'

export default {
    state: {
        ads: [],
        fileProgress: 0
    },
    getters: {
        getAds(state) {
            return state.ads
        },
        getAdById(state) {
            return id => state.ads.find(p => p.id === id)
        },
        getFileProgress(state) {
            return state.fileProgress.toFixed(0);
        }
    },
    mutations: {
        getAllAds(state, payload) {
            state.ads = payload;
        },
        createAd(state, payload) {
            state.ads.push(payload)
        },
        updateAd(state, payload) {
            const idx = state.ads.findIndex(p => p.id === payload.id);
            state.ads[idx] = payload;
        },
        deleteAd(state, payload) {
            const idx = state.ads.findIndex(p => p.id === payload.id);
            state.ads.splice(idx, 1);
        }
    },
    actions: {
        async getAllAds({commit}) {
            try {
                // Get all documents from collections
                const allAds = await fbs.firestore().collection('ads').get();

                const adsArray = [];

                //Fetch data from each document, add  document id and push to result array
                allAds.forEach((item, key) => {
                    adsArray.push({
                        ...item.data(),
                        id: item.id
                    })
                });

                //Add result array to ads state
                commit('getAllAds', adsArray);

            } catch (e) {
                console.log(e);
            }
        },
        async createAd({commit, state}, payload) {
            try {
                //Create data object to create
                const newAd = Object.assign({}, {
                    title: payload.title,
                    desc: payload.desc,
                    imgSrc: null,

                });

                //Add new document
                const ad = await fbs.firestore().collection('ads').add(newAd);

                //Сondition if image load
                if (payload.imgSrc !== null) {
                    const image = payload.imgSrc;
                    //Get image extention
                    const imgExt = image.name.slice(image.name.lastIndexOf('.'));
                    //Create file ref
                    const imgRef = `ads/${ad.id}${imgExt}`;
                    //Load file to storage
                    const uploadTask = fbs.storage().ref(imgRef).put(image);
                    //Progress bar function
                    uploadTask.on('state_changed', (snapshot) => {

                        state.fileProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                    }, (error) => {
                        console.log(error);
                    }, () => {
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {

                            fbs.firestore().collection('ads').doc(ad.id).update({
                                imgSrc: downloadURL,
                                imgRef
                            }).then();

                            state.fileProgress = 0;

                            commit('createAd', {
                                ...newAd,
                                id: ad.id,
                                imgSrc: downloadURL,
                                imgRef
                            })
                        });
                    });
                } else {
                    commit('createAd', {
                        ...newAd,
                        id: ad.id
                    })
                }

            } catch (e) {
                console.log(e);
            }
        },
        async updateAd({commit, state}, payload) {
            try {
                //Create data object to create
                const adNew = Object.assign({}, {
                    title: payload.title,
                    desc: payload.desc,
                });

                //Get a reference to the document that needs to be updated.
                const adRef = fbs.firestore().collection('ads').doc(payload.id);

                //Сondition if image load
                if (payload.imgSrc !== null) {
                    const image = payload.imgSrc;
                    //Get image extention
                    const imgExt = image.name.slice(image.name.lastIndexOf('.'));
                    //Create file ref
                    const imgRef = `ads/${payload.id}${imgExt}`;
                    //Load file to storage
                    const uploadTask = fbs.storage().ref(imgRef).put(image);
                    //Progress bar function
                    uploadTask.on('state_changed', (snapshot) => {

                        state.fileProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                    }, (error) => {
                        console.log(error);
                    }, () => {
                        uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {

                            state.fileProgress = 0;

                            adNew.imgSrc = downloadURL;
                            adNew.imgRef = imgRef;

                            await adRef.update(adNew);

                            commit('updateAd', {
                                ...adNew,
                                id: payload.id,
                                imgSrc: downloadURL,
                                imgRef
                            })
                        });
                    });
                } else {

                    await adRef.update(adNew);

                    commit('updateAd', {
                        ...adNew,
                        id: payload.id
                    })
                }

            } catch (e) {
                console.log(e);
            }
        },
        async deleteAd({commit}, payload) {
            try {
                // Create reference
                const adRef = fbs.firestore().collection('ads').doc(payload);
                // Get document data
                const  docData = await adRef.get();
                const imgRef = docData.data().imgRef;

                // Delete document
                await adRef.delete();

                if (imgRef) {
                    // Delete file
                    await fbs.storage().ref(imgRef).delete();
                }

                // Delete item from store
                commit('deleteAd', payload)

            } catch (e) {
                console.log(e)
            }
        }
    }
}
