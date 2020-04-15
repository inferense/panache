import pandas as pd
import numpy as np
from sklearn import svm
from sklearn.model_selection import train_test_split
from sklearn import metrics


class Process():
    def __init__(self, source):
        self.data = source

        # for i in self.data.all(1):
        #     if i == True:
        #         self.drop_zeros = self.data.loc[(self.data == 0).all(1)].index
        #         self.data = self.data.drop(self.drop_zeros, axis=0)
        #         self.data = self.data.reset_index(drop=True)
        #         self.data = self.data.loc[:10]
        #
        #     else:
        #         self.data = self.data[:10]

        self.drop_zeros = self.data.loc[(self.data == 0).any(1)].index
        self.data = self.data.drop(self.drop_zeros, axis=0)
        self.data = self.data.reset_index(drop=True)
        self.data = self.data.loc[:10]

    def frames(self):
        self.frames = []
        self.n = 0

        while self.n != len(self.data) - 1:
            self.frames.append(self.data.loc[self.n:self.n + 1].to_numpy())
            self.n += 1

    #         else:
    #             return self.frames

    def FFT(self):
        self.feature_set = np.array([])

        for frame in self.frames:
            frame_feature_set = np.array([])

            fft_frame = np.fft.fft(frame, axis=0)

            mean = np.mean(fft_frame, axis=0)
            frame_feature_set = np.concatenate((frame_feature_set, mean), axis=0)

            energy = (np.sum((fft_frame ** 2), axis=0)) / len(fft_frame)
            frame_feature_set = np.concatenate((frame_feature_set, energy), axis=0)

            stdev = np.std(fft_frame, axis=0)
            frame_feature_set = np.concatenate((frame_feature_set, stdev), axis=0)

            correlation = np.corrcoef(fft_frame, rowvar=False).reshape(3, 3)
            frame_feature_set = np.concatenate((frame_feature_set.reshape(3, 3), correlation), axis=0)

            self.feature_set = np.concatenate((frame_feature_set.flatten(), self.feature_set), axis=0)

    #         return self.feature_set

    def feed(self):
        self.feature_set = self.feature_set.reshape(1, -1)
        self.feature_set = np.abs(self.feature_set)
        return self.feature_set

