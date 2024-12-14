import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SpotifyService } from '../services/spotify/spotify.service';

export const authguardGuard: CanActivateFn = (route, state) => {
  const spotifyService = inject(SpotifyService);
  const router = inject(Router);

  if (spotifyService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
