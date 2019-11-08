export type AutocompletePredictionResponse = {
    status: string;
    predictions: google.maps.places.AutocompletePrediction[];
};

export type PlaceResultResponse = {
    result: google.maps.places.PlaceResult;
    status: string;
};
