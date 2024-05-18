// useEffect(() => {
    //     const parseGpx = async () => {
    //         try {
    //             // const response = await fetch('your_gpx_file_url_here');
    //             // const xml = await response.text();
    //             // xml2js.parseString(GPX1,async  (error:any, result:any) => {
    //             //     if (error) {
    //             //       console.error('Error parsing XML:', error);
    //             //       return;
    //             //     }
    //             //     const gpxData = result?.gpx;
    //             //     console.log("GPXD", gpxData.trk[0].trkseg[0].trkpt)
    //             //     if (!gpxData) {
    //             //       console.error('GPX data not found');
    //             //       return;
    //             //     }
    //             //     const parsedWaypoints = gpxData?.wpt?.map((waypoint: any) => ({
    //             //       latitude: parseFloat(waypoint?.$?.lat || 0),
    //             //       longitude: parseFloat(waypoint?.$?.lon || 0),
    //             //       name: waypoint?.name?.[0] || 'Unknown',
    //             //       elevation: parseFloat(waypoint?.ele?.[0] || 0),
    //             //     })) as Waypoint[];
    //             //     const parsedTrackPoints = gpxData?.trk?.map((track: any) =>
    //             //       track?.trkseg?.map((segment: any) =>
    //             //         segment?.trkpt?.map((point: any) => ({
    //             //           latitude: parseFloat(point?.$?.lat ?? 0),
    //             //           longitude: parseFloat(point?.$?.lon ?? 0),
    //             //           elevation: parseFloat(point?.ele?.[0] ?? 0),
    //             //         }))
    //             //       )
    //             //     ) as TrackPoint[];
    //             //     setWaypoints(parsedWaypoints);
    //             //     let flatParsedTrackPoints = parsedTrackPoints.flat().flat().flat()
    //             //     // console.log("POL",parsedWaypoints);
    //             //     setTrackPoints(flatParsedTrackPoints);

    //             //     const outputPath1 = `${RNFS.MainBundlePath}/output1.json`;
    //             //     await RNFS.writeFile(outputPath1, JSON.stringify(flatParsedTrackPoints), 'utf8');
    //             //     console.log('flatParsedTrackPoints has been written to output1.json');
    //             //     console.log(RNFS.MainBundlePath)

    //             //     // Write parsedWaypoints to output2.json
    //             //     const outputPath2 = `${RNFS.MainBundlePath}/output2.json`;
    //             //     await RNFS.writeFile(outputPath2, JSON.stringify(parsedWaypoints), 'utf8');
    //             //     console.log('parsedWaypoints has been written to output2.json');
    //             // });
    //         } catch (error) {
    //             console.error('Error fetching GPX file:', error);
    //         }
    //     };

    //     parseGpx();

    //     // Clean up function
    //     return () => {
    //         // Any cleanup code if needed
    //     };
    // }, []);

    