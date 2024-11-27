import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { SpotifyService } from "./services/spotify/spotify.service";

@Injectable({
  providedIn: "root"
})

export class AuthGuard implements CanActivate {
  constructor( private spotifyService: SpotifyService, private router: Router ) {}

  canActivate(): boolean {
    if (this.spotifyService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}