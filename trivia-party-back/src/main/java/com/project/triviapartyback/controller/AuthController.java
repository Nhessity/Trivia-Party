package com.project.triviapartyback.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;

import org.apache.hc.core5.http.ParseException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.hash.HashCode;
import com.google.common.hash.Hashing;

import ch.qos.logback.core.net.SyslogOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.SpotifyHttpManager;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.credentials.AuthorizationCodeCredentials;
import se.michaelthelin.spotify.model_objects.specification.Artist;
import se.michaelthelin.spotify.model_objects.specification.Paging;
import se.michaelthelin.spotify.model_objects.specification.User;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeUriRequest;
import se.michaelthelin.spotify.requests.authorization.authorization_code.pkce.AuthorizationCodePKCERequest;
import se.michaelthelin.spotify.requests.data.personalization.simplified.GetUsersTopArtistsRequest;
import se.michaelthelin.spotify.requests.data.users_profile.GetCurrentUsersProfileRequest;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
@RestController
@RequestMapping("/api")
public class AuthController {
    /* OLD CODE NOT USING PKCE
    private static final URI redirectUri = SpotifyHttpManager.makeUri("http:localhost:8080/api/callback/");
    private static final String clientId = "ae5f44b004754463ae3db48891687fa3";
    private String code = "";

    private static final SpotifyApi spotifyApi = new SpotifyApi.Builder()
    .setClientId(clientId)
    .setRedirectUri(redirectUri)
    .build();

    @GetMapping("login")
    @ResponseBody
    public String spotifyLogin() {
        AuthorizationCodeUriRequest authorizationCodeUriRequest = spotifyApi.authorizationCodeUri()
            .scope("user-read-private, user-read-email, user-top-read")
            .show_dialog(true)
            .build();
        final URI uri = authorizationCodeUriRequest.execute();
        return uri.toString();
    }
    */

    private static final URI redirectUri = SpotifyHttpManager.makeUri("http://localhost:8080/api/get-user-code");
    private static final String clientId = "ae5f44b004754463ae3db48891687fa3";
    // private static final String codeChallenge;
    

    // string generator for code verifier
    public static String generateRandomString(int length){
        String text = "";
        String possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefhijklmnopqrstuvqxyz1234567890";

        for(int i = 0; i < length; i++){
            text += possible.charAt((int)Math.floor(Math.random() * possible.length()));
        }
        System.out.println("generating string: " + text);
        return text;
    }

    public String generateCodeChallenge(String codeVerifier) throws NoSuchAlgorithmException, UnsupportedEncodingException{
        // MessageDigest not thread-safe; use new instance for every thread
        // hash using sha-256 algorithm
        /*
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] encodedhash = digest.digest(codeVerifier.getBytes(StandardCharsets.UTF_8));

        // convert bytes to hex --> is this necessary? can I just use encodedhash.toString() in line 76 instead
        StringBuilder hexString = new StringBuilder(2 * encodedhash.length);
        for (int i = 0; i < encodedhash.length; i++){
            String hex = Integer.toHexString(0xff & encodedhash[i]);
            if(hex.length() == 1){
                hexString.append('0');
            }
            hexString.append(hex);
        }
        */

        HashCode sha256hex = Hashing.sha256().hashBytes(codeVerifier.getBytes(StandardCharsets.US_ASCII));
    
        //String encodedCodeVerifier = Base64.getEncoder().encodeToString(sha256hex.toString().getBytes());
        String encodedCodeVerifier = Base64.getUrlEncoder().withoutPadding().encodeToString(sha256hex.asBytes());
        return encodedCodeVerifier;
        
        // byte[] bytes = codeVerifier.getBytes("US-ASCII");
        // MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
        // messageDigest.update(bytes, 0, bytes.length);
        // byte[] digest = messageDigest.digest();
        // return Base64.getUrlEncoder().withoutPadding().encodeToString(digest);
    }

    private static final SpotifyApi spotifyApi = new SpotifyApi.Builder()
        .setClientId(clientId)
        .setRedirectUri(redirectUri)
        .build();

    String codeVerifier = generateRandomString(128);
    //String codeVerifier = "kPhgD7uiJI6LCHsEe2k6AxGH1ZROu4VPi2YXejVZkSEgcLacrTVz0zIs9p09fUy8mEffECpMw4FLU39boHv3OmxObZgpomKhJhjyzqOBmJdCoTsL3rxJkLDe7O34EHee";

    @GetMapping("login")
    @ResponseBody
    public String requestAuthentication() throws NoSuchAlgorithmException, UnsupportedEncodingException {
        String state = generateRandomString(16);
        System.out.println("Using codeVerifier: " + codeVerifier);
        String codeChallenge = generateCodeChallenge(codeVerifier);
        System.out.println("Using codeChallenge: " + codeChallenge);
        
        final AuthorizationCodeUriRequest authorizationCodeUriRequest = spotifyApi.authorizationCodePKCEUri(codeChallenge)
        //final AuthorizationCodeUriRequest authorizationCodeUriRequest = spotifyApi.authorizationCodePKCEUri("wRZN-XfEjdt_b1dfkvL2rGK8JzVEM4tKCHDZ9-n2apU")
        .state(state)
        .scope("user-read-private user-read-email user-top-read")
        .show_dialog(true)
        .code_challenge_method("S256")
        .build();
        System.out.println("WE GOT 1!");
        
        final URI uri = authorizationCodeUriRequest.execute();
        System.out.println("WE GOT 2!");
        System.out.println("URI: " + uri.toString());
        return uri.toString();
    }

    @GetMapping("get-user-code")
    public String getSpotifyUserCode(@RequestParam("code") String userCode, HttpServletResponse response) throws IOException{
        String code = userCode;
        System.out.println("WE GOT 3!");
        System.out.println("Using codeVerifier check: " + codeVerifier);
        AuthorizationCodePKCERequest authorizationCodePKCERequest = spotifyApi.authorizationCodePKCE(code, codeVerifier).build();
        System.out.println("WE GOT CODE!");
        try{
            final AuthorizationCodeCredentials authorizationCodeCredentials = authorizationCodePKCERequest.execute();

            spotifyApi.setAccessToken(authorizationCodeCredentials.getAccessToken());
            spotifyApi.setRefreshToken(authorizationCodeCredentials.getRefreshToken());

            System.out.println("Expires in: " + authorizationCodeCredentials.getExpiresIn());
        } catch (IOException | SpotifyWebApiException | org.apache.hc.core5.http.ParseException e) {
            System.out.println("Error: " + e);
        }

        response.sendRedirect("http://localhost:3000");
        System.out.println("WE LOGGED IN!");
        System.out.println("Access token: " + spotifyApi.getAccessToken());
        return spotifyApi.getAccessToken();
        //return "sadge";
    }

    //TO DO: Refresh token

    // temp get top artists
    @GetMapping(value = "get-top-artists")
    public Artist[] getUserTopArtists() {
        final GetUsersTopArtistsRequest getUsersTopArtistsRequest = spotifyApi.getUsersTopArtists()
            .time_range("medium_term")
            .limit(10)
            .offset(5)
            .build();
        
            try{
                final Paging<Artist> artistPaging = getUsersTopArtistsRequest.execute();
                return artistPaging.getItems();
            } catch (Exception e){
                System.out.println("Something went wrong!\n" + e.getMessage());
            }

            return new Artist[0];
    }

    @GetMapping(value = "get-current-profile")
    public static String getCurrentUsersProfile_Sync() {
        final GetCurrentUsersProfileRequest getCurrentUsersProfileRequest = spotifyApi.getCurrentUsersProfile()
        .build();
        try {
          final User user = getCurrentUsersProfileRequest.execute();
    
          System.out.println("Display name: " + user.getDisplayName());
          return user.getDisplayName();
        } catch (IOException | SpotifyWebApiException | ParseException e) {
          System.out.println("Error: " + e.getMessage());
        }
        return null;
      }
}


