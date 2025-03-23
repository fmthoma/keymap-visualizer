{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
  };

  outputs = { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      packages.${system} = {
        keymap-visualizer = pkgs.callPackage ./package.nix;
        default = self.packages.${system}.keymap-visualizer;
      };
    };
}
