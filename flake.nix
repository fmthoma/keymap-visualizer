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
        # `nix build .#keymap-visualizer`
        keymap-visualizer = pkgs.callPackage ./package.nix {};

        # `nix build .`
        default = self.packages.${system}.keymap-visualizer;
      };

      overlays.default = final: prev: {
        keymap-visualizer = self.packages.${system}.keymap-visualizer;
      };
    };
}
